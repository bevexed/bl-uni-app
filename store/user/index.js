import actions from './actions';
import mutations from './mutations';
import * as getters from './getters';
import state from './state';

console.log(state);

export default {
    namespaced: true,
    mutations,
    actions,
    state,
    getters,
};
