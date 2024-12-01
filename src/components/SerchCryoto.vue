<template>
   <div class="search-card" aria-controls="search-crypto" :data-active="isActive">
      <div class="input-field input-field-search">
         <img class="input-field-search-icon" src="../assets/icon-search.svg" alt="search-icon">
         <input type="text" class="input body-md search-input" placeholder="Search">
         <p class="input-description search-input-description body-md">
               Select crypto from the list or search the one you need
         </p>
      </div>
      <div class="search-results">
         <div class="search-result search-currency-result">
               <div class="search-currency-result__radio-button">
                  <input type="radio" name="currency" id="currency-template"
                     class="search-currency-result__radio-button_input hidden">
                  <label for="currency-template" class="search-currency-result__radio-button_label">
                     <img src="../assets/image-placeholder.jpg" alt="image-placeholder" class="search-result-icon">
                     <span class="search-result-name body-md-b">
                     </span>
                  </label>
               </div>
         </div>
      </div>
      <button class="search-btn-save btn btn-primary" type="button" id="save-currency-choice">
         Save
      </button>
   </div>
</template>

<script>
export default {
   name: 'SearchCrypto',
   props: {
   },
   data() {
      return {
         isActive: false,
      };
   },
   computed: {
   },
   methods: {
   },
};
</script>