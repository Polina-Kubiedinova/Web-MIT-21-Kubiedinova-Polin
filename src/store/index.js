import { createStore } from 'vuex';

export default createStore({
   state: {
      currencies: [
         {
               handle: "BTC",
               title: "Bitcoin",
               value: 65000, // 1 btc = 65000 usdt
               priceCurrency: "USDT"
         },
         {
               handle: "ETH",
               title: "Ethereum",
               value: 2500, // 1 eth = 2500 usdt
               priceCurrency: "USDT"
         }
      ],
      settings: [
         {
               id: "setting-127346238",
               title: "BTC & USDT increase each 2 sec for T-Shirts",
               status: "draft",
               formulas: [
                  {
                     id: "formula-123456",
                     title: "BTC in used for T-Shirts",
                     formula: "X * Y",
                     frequency: 2000,
                     currency: "BTC",
                     targets: {
                           collectionsIds: ['collection-1827498', 'collection-324545634'],
                           products: [
                              {
                                 id: 'product-23423523',
                                 variantsIds: ['variant-23423523', 'variant-23423524']
                              }
                           ]
                     }
                  },
                  {
                     id: "formula-123456",
                     title: "BTC in used for T-Shirts",
                     formula: "X * Y",
                     frequency: 2000,
                     currency: "ASD",
                     targets: {
                           collectionsIds: ['collection-1827498', 'collection-324545634'],
                           products: [
                              {
                                 id: 'product-23423523',
                                 variantsIds: ['variant-23423523', 'variant-23423524']
                              }
                           ]
                     }
                  }
               ]
         },
         {
               id: "setting-127346239",
               title: "ETH & USDT increase each 3 sec for Hoodies",
               status: "active",
               formulas: [
                  {
                     id: "formula-123457",
                     title: "ETH in used for Hoodies",
                     formula: "X * Y",
                     frequency: 3000,
                     currency: "ETH",
                     targets: {
                           collectionsIds: ['collection-324545634'],
                           products: []
                     }
                  }
               ]
         },
         {
               id: "setting-127346240",
               title: "BTC & USDT increase each 4 sec for T-Shirts",
               status: "draft",
               formulas: [
                  {
                     id: "formula-123458",
                     title: "BTC in used for T-Shirts",
                     formula: "X * Y",
                     frequency: 4000,
                     currency: "BTC",
                     targets: {
                           collectionsIds: ['collection-1827498', 'collection-324545634'],
                           products: [
                              {
                                 id: 'product-23423523',
                                 variantsIds: ['variant-23423523', 'variant-23423524']
                              }
                           ]
                     }
                  }
               ]
         }
      ],
      collections: [
         {
               id: "collection-1827498",
               title: "T-Shirts"
         },
         {
               id: "collection-324545634",
               title: "Hoodies"
         }
      ],
      products: [
         {
               id: "product-23423523",
               title: "Product 1",
               price: 11,
               variants: [
                  {
                     id: "variant-23423523",
                     title: "Black",
                     price: 11
                  },
                  {
                     id: "variant-23423524",
                     title: "Red",
                     price: 12
                  }
               ]
         }
      ]
   },
   mutations: {
      /**
      * Add new setting to the settings array
      */
      REMOVE_SETTING(state, settingId) {
         state.settings = state.settings.filter(setting => setting.id !== settingId);
      },
      ADD_SETTING(state, setting) {
         state.settings.push(setting);
      }
   },
   actions: {
      /**
      * Remove the setting from the settings array
      */
      removeSetting({ commit }, settingId) {
         // call the mutation
         commit('REMOVE_SETTING', settingId);
      },
      /**
      * Create the setting
      */
      createSetting({ commit }, setting) {
         // call the mutation
         commit('ADD_SETTING', setting);
      },
      updateSetting({ commit }, setting) {
         // call the mutation
         commit('REMOVE_SETTING', setting.id);
         commit('ADD_SETTING', setting);
      }
   },
   getters: {
      currencies: (state) => state.currencies,
      settings: (state) => state.settings,
      usedCurrencies: (state) => {
         const arraysOfFoundCurrencies = state.settings?.map(setting => setting.formulas.map(formula => formula.currency))?.flat();
         const arrayWithoutDuplicates = [...new Set(arraysOfFoundCurrencies)];
         return arrayWithoutDuplicates;
      },
      getSettingById: (state) => (settingId) => {
         return state.settings.find(setting => setting.id === settingId);
      },
   },
});