<template>
   <div class="formula-settings-card">
      <div class="formula-heading">
         <h2 class="heading-lg">
               Add products
         </h2>
         <span class="formula-heading-icon formula-heading-icon-arrow">
               <img src="../assets/icon-arrow-top.svg" alt="arrow-top">
         </span>
      </div>
      <div class="search-card" aria-controls="search-collections">
         <div class="input-field input-field-search">
               <img class="input-field-search-icon" src="../assets/icon-search.svg" alt="search-icon">
               <input type="text" class="input body-md search-input" placeholder="Search" id="search-product-input">
         </div>
         <div class="selected-collections-input-field custom-checkbox-field" id="select-all-products-wrapper">
               <input class="custom-checkbox-input" type="checkbox" name="selected" id="select-all-products" checked>
               <label class="custom-checkbox-label" for="select-all-products">
                  <div class="custom-checkbox">
                     <img src="../assets/icon-minus.svg" alt="minus-icon" class="custom-checkbox-checkmark">
                  </div>
                  <span class="custom-checkbox-label-title body-md-b" id="selected-products-quantity">
                     2 selected
                  </span>
               </label>
         </div>
         <div class="search-results" id="search-products-results-container">
               <div class="search-result search-result-product-wrapper hidden" id="search-product-result-template">
                  <div class="search-result-product custom-checkbox-field">
                     <input class="custom-checkbox-input" type="checkbox" name="selected-product" id="" checked>
                     <label class="custom-checkbox-label" for="">
                           <div class="custom-checkbox">
                              <img src="../assets/icon-checkmark.svg" alt="checkmark-icon"
                                 class="custom-checkbox-checkmark">
                           </div>
                           <img src="../assets/image-placeholder.jpg" alt="image-placeholder"
                              class="custom-checkbox-label-image">
                           <span class="custom-checkbox-label-title body-md-b product-title">
                           </span>
                     </label>
                  </div>
                  <div class="search-result-variant custom-checkbox-field hidden">
                     <input class="custom-checkbox-input" type="checkbox" name="selected-variant" id="" checked>
                     <label class="custom-checkbox-label" for="">
                           <div class="custom-checkbox">
                              <img src="../assets/icon-checkmark.svg" alt="checkmark-icon"
                                 class="custom-checkbox-checkmark">
                           </div>
                           <img src="../assets/image-placeholder.jpg" alt="image-placeholder"
                              class="custom-checkbox-label-image">
                           <span class="custom-checkbox-label-title body-md-b variant-title">
                           </span>
                     </label>
                  </div>
               </div>
         </div>
      </div>
      <div class="formula-settings-card-controls">
         <button class="search-btn-cancel btn btn-secondary" aria-controls="cancel-selected-products">
               Cancel
         </button>
         <button class="search-btn-save btn btn-primary" aria-controls="save-selected-products">
               Save
         </button>
      </div>
   </div>
</template>

<script>
export default {
   name: 'SearchProducts',
   props: {
   },
   computed: {
   },
   methods: {
   },
};
</script>