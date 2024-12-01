<template>
   <div class="container">
      <header class="header">
         <nav class="header-nav">
               <ul class="header-nav-ul">
                  <li class="header-nav-li">
                     <button @click="goHome" class="header-nav-link body-lg">settings</button>
                  </li>
                  <li class="header-nav-li">
                     <button @click="goToSetting" class="header-nav-link body-lg">
                           {{ setting.title }}
                     </button>
                  </li>
                  <li class="header-nav-li">
                     <a href="#" class="header-nav-link body-lg">
                           {{ formula.title }}
                     </a>
                  </li>
               </ul>
         </nav>
         <div class="header-controls">
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
         </div>
      </header>
      <div class="formula-title-field input-field">
         <span class="input-label body-lg">
               Title
         </span>
         <input type="text" v-model="formula.title" class="input body-md formula-title-input"
               placeholder="formula-name">
      </div>
      <div class="formula-main">
         <div class="formula-settings formula-column">
               <div class="formula-settings-card">
                  <div class="formula-heading">
                     <h2 class="heading-lg">
                           Formula settings
                     </h2>
                     <span class="formula-heading-icon">
                           <img src="../assets/icon-question.svg" alt="question">
                     </span>
                  </div>
                  <div class="input-field">
                     <span class="input-label body-lg">
                           Formula
                     </span>
                     <input type="text" v-model="formula.formula" class="input body-md formula-input"
                           placeholder="X * Y">
                     <p class="input-description body-md">
                           X - cryptocurrency price, Y - product price
                     </p>
                  </div>
                  <div class="input-field">
                     <span class="input-label body-lg">
                           Frequency
                     </span>
                     <input type="text" v-model="formula.frequency" class="input body-md frequency-input"
                           placeholder="1000">
                     <p class="input-description body-md">
                           Cryptocurrency price update frequency. In milliseconds (like 1000ms == 1s)
                     </p>
                  </div>
                  <SearchCrypto></SearchCrypto>
               </div>
         </div>
         <div class="formula-collections formula-column">
               <SearchCollections></SearchCollections>
               <SearchProducts></SearchProducts>
         </div>
      </div>
   </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import SearchCrypto from '../components/SearchCrypto.vue';
import SearchCollections from '../components/SearchCollections.vue';
import SearchProducts from '../components/SearchProducts.vue';

export default {
   props: {
      formulaId: {
         type: String,
         required: true,
      },
      settingId: {
         type: String,
         required: true,
      }
   },
   data() {
      return {
         setting: {},
         formulaBackup: {},
         formula: {
               id: this.formulaId,
               title: "Some title",
               formula: "X * Y",
               frequency: 2000,
               currency: "",
               targets: {
                  collectionsIds: [],
                  products: []
               }
         },
         wasSomethingChanged: false,
      };
   },
   computed: {
      ...mapGetters(['getSettingById']),
      getSetting() {
         return this.getSettingById(this.settingId);
      },
   },
   methods: {
      ...mapActions({
         updateSettingAction: 'updateSetting',
      }),
      goHome() {
         this.$router.push({ name: 'Home' });
      },
      goToSetting() {
         this.$router.push({ name: 'Setting', params: { id: this.settingId } });
      },
      discardChanges() { 
         this.formula = JSON.parse(JSON.stringify(this.formulaBackup));
         this.wasSomethingChanged = false;
      },
      saveChanges() { 
         const formulaIdx = this.setting.formulas.findIndex(formula => formula.id === this.formulaId);
         this.setting.formulas[formulaIdx] = this.formula;
         this.updateSettingAction(this.setting);
         this.formulaBackup = JSON.parse(JSON.stringify(this.formula));
         this.wasSomethingChanged = false;
      },
   },
   created() {
      this.setting = JSON.parse(JSON.stringify(this.getSetting));
      const formula = this.setting.formulas.find(formula => formula.id === this.formulaId);
      if (formula) {
         this.formula = JSON.parse(JSON.stringify(formula));
      } else {
         this.setting.formulas.push(this.formula);
         this.updateSettingAction(this.setting);
      }
      this.formulaBackup = JSON.parse(JSON.stringify(this.formula));
   },
   watch: {
      formula: {
         handler(newValue) {
               if (newValue.title === this.formulaBackup.title &&
                  newValue.formula === this.formulaBackup.formula &&
                  newValue.frequency === this.formulaBackup.frequency
               ) return;
               this.wasSomethingChanged = true;
         },
         deep: true,
      },
   },
   components: {
      SearchCrypto,
      SearchCollections,
      SearchProducts
   },
};
</script>

<style scoped></style>