import state from "./set.json" with { type: "json" };
function getState() {
   const state = localStorage.getItem('state');
   return state ? JSON.parse(state) : { settings: [], currencies: {} };
}
function updateState(state) {
   localStorage.setItem('state', JSON.stringify(state));
}
function getCurrentFormula(currentSetting, formulaId) {
   if (formulaId) {
      return currentSetting.formulas.find(f => f.id == formulaId);
   }
   const newFormula = {
      id: Date.now(),
      title: "New Formula",
      formula: "",
      frequency: 1000,
      currency: "",
      targets: {
         collectionsIds: [],
         products: []
      }
   };
   currentSetting.formulas.push(newFormula);
   updateState(getState());
   return newFormula;
}