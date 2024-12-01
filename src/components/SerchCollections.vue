<template>
   <div class="formula-settings-card">
      <div class="formula-heading">
         <h2 class="heading-lg">
               Add collections
         </h2>
         <span class="formula-heading-icon formula-heading-icon-arrow">
               <img src="../assets/icon-arrow-top.svg" alt="arrow-top">
         </span>
      </div>
      <div class="search-card" aria-controls="search-collections">
         <div class="input-field input-field-search">
               <img class="input-field-search-icon" src="../assets/icon-search.svg" alt="search-icon">
               <input type="text" id="search-collection-input" class="input body-md search-input" placeholder="Search">
         </div>
         <div class="selected-collections-input-field custom-checkbox-field" id="select-all-collections-wrapper">
               <input class="custom-checkbox-input" type="checkbox" id="select-all-collections-input" checked>
               <label class="custom-checkbox-label" for="select-all-collections-input">
                  <div class="custom-checkbox">
                     <img src="../assets/icon-minus.svg" alt="minus-icon" class="custom-checkbox-checkmark">
                  </div>
                  <span class="custom-checkbox-label-title body-md-b" id="selected-collections-quantity">
                     2 selected
                  </span>
               </label>
         </div>
         <div class="search-results" id="search-collections-results-container">
               <div class="search-result custom-checkbox-field hidden" id="serach-collection-result-template">
                  <input class="custom-checkbox-input" type="checkbox" name="selected-collection"
                     id="found-collection-1" checked>
                  <label class="custom-checkbox-label" for="found-collection-1">
                     <div class="custom-checkbox">
                           <img src="../assets/icon-checkmark.svg" alt="checkmark-icon"
                              class="custom-checkbox-checkmark">
                     </div>
                     <img src="../assets/image-placeholder.jpg" alt="image-placeholder"
                           class="custom-checkbox-label-image">
                     <span class="custom-checkbox-label-title body-md-b">
                     </span>
                  </label>
               </div>
         </div>
      </div>
      <div class="formula-settings-card-controls">
         <button class="search-btn-cancel btn btn-secondary" aria-controls="cancel-selected-collections">
               Cancel
         </button>
         <button class="search-btn-save btn btn-primary" aria-controls="save-selected-collections">
               Save
         </button>
      </div>
   </div>
</template>

<script>
export default {
   name: 'SearchCollections',
   props: {
   },
   computed: {
   },
   methods: {
   },
};
</script>