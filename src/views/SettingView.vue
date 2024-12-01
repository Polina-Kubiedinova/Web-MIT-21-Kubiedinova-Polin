<template>
   <div class="container">
      <header class="header">
         <nav class="header-nav">
               <ul class="header-nav-ul">
                  <li class="header-nav-li">
                     <button @click="goHome" class="header-nav-link body-lg">settings</button>
                  </li>
                  <li class="header-nav-li">
                     <a href="#" class="header-nav-link body-lg">
                           {{ setting.title }}
                     </a>
                  </li>
               </ul>
         </nav>
         <div class="header-controls">
               <button @click="toggleSetting" class="btn-primary btn" aria-controls="toggle"
                  :data-status="setting.status">
                  <span class="inner-text inner-text-activate">
                     Activate
                  </span>
                  <span class="inner-text inner-text-disable">
                     Disable
                  </span>
               </button>
               <button @click="discardChanges" class="btn-secondary btn" :class="{
                  'disabled': !wasSomethingChanged
               }" aria-controls="discard">
                  Discard
               </button>
               <button @click="saveChanges" class="btn-primary btn" :class="{
                  'disabled': !wasSomethingChanged
               }" aria-controls="save">
                  Save
               </button>
               <button @click="createFormula" class="btn-primary btn" aria-controls="create-formula">
                  Create Formula
               </button>
         </div>
      </header>
      <div class="input-field setting-input-field">
         <span class="input-label body-lg">
               Title
         </span>
         <input type="text" v-model="setting.title" class="input body-md" placeholder="setting-name">
      </div>
      <div class="empty-state" v-if="!setting?.formulas?.length || setting?.formulas?.length < 1">
         <img src="../assets/icon-empty.svg" alt="empty-state" class="empty-state-img">
         <p class="empty-state-text body-lg-b">
               Oopsie, seems that you have no formulas yet
         </p>
         <p class="empty-state-underline body-sm">
               Create your first formula!
         </p>
         <button @click="createFormula" class="btn btn-primary" aria-controls="create-formula">+</button>
      </div>
      <div class="formulas" v-if="setting?.formulas?.length > 0">
         <h2 class="formulas-heading heading-lg">
               Formulas
         </h2>
         <div class="formulas-list">
               <div class="formula-line" v-for="(formula, idx) in setting.formulas" :key="idx">
                  <button @click="editFormula(formula.id)" class="formula-title">
                     {{ formula.title }}
                  </button>
                  <div class="formula-line-controls">
                     <button @click="editFormula(formula.id)" class="formula-btn" aria-controls="edit-formula">
                           <img src="../assets/icon-edit.svg" alt="icon-edit" class="formula-edit-icon">
                     </button>
                     <button @click="removeFormula(formula.id)" class="formula-btn" aria-controls="remove-formula">
                           <img src="../assets/icon-remove.svg" alt="icon-remove" class="formula-edit-icon">
                     </button>
                  </div>
               </div>
         </div>
      </div>
   </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
   props: {
      id: {
         type: String,
         required: true,
      },
   },
   data() {
      return {
         settingBackup: {},
         setting: this.getSetting || {
               id: this.id,
               title: 'default-setting',
               status: 'draft',
               formulas: [],
         },
         wasSomethingChanged: false,
      };
   },
   computed: {
      ...mapGetters(['getSettingById']),
      getSetting() {
         return this.getSettingById(this.id);
      },
   },
   methods: {
      ...mapActions({
         createSettingAction: 'createSetting',
         updateSettingAction: 'updateSetting',
      }),
      editFormula(id = null) {
         const timestamp = new Date().getTime();
         const formulaId = id || `formula-${timestamp}`;
         this.$router.push({ name: 'Formula', params: { formulaId, settingId: this.id } });
      },
      goHome() {
         this.$router.push({ name: 'Home' });
      },
      toggleSetting() {
         this.setting.status = this.setting.status === 'active' ? 'draft' : 'active';
         this.wasSomethingChanged = true;
      },
      discardChanges() {
         this.setting = JSON.parse(JSON.stringify(this.settingBackup));
         this.wasSomethingChanged = false;
      },
      saveChanges() {
         this.updateSettingAction(this.setting);
         this.settingBackup = JSON.parse(JSON.stringify(this.setting));
         this.wasSomethingChanged = false;
      },
      createFormula() {
         this.editFormula();
      },
      removeFormula(id) { 
         this.setting.formulas = this.setting.formulas.filter((formula) => formula.id !== id);
         this.wasSomethingChanged = true;
      },
   },
   watch: {
      setting: {
         handler: function (value) {
               if (this.settingBackup.title === value.title) return;
               this.wasSomethingChanged = true;
         },
         deep: true
      },
   },
   created() {
      if (!this.getSetting) {
         this.createSettingAction(this.setting);
      }

      this.setting = JSON.parse(JSON.stringify(this.getSetting));
      this.settingBackup = JSON.parse(JSON.stringify(this.getSetting));
   }
};
</script>