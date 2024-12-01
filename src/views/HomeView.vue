<template>
    <div>
        <div class="container">
            <header class="header">
                <h1 class="page-heading">Settings</h1>
                <div class="header-controls">
                    <button @click="createSetting" class="btn-primary btn" aria-controls="create-setting">
                        Create setting
                    </button>
                </div>
            </header>

            <div class="tabs">
                <button @click="setCurrencyToFilter('')" class="tab body-md" :class="{
                    'active': !filterByCurrency
                }">All settings</button>
                <button @click="setCurrencyToFilter(currency)" class="tab body-md"
                    v-for="(currency, idx) in usedCurrencies" :key="idx" :class="{
                        'active': currency === filterByCurrency
                    }">
                    {{ currency }}
                </button>
            </div>

            <div class="empty-state" v-if="!settings?.length || settings.length < 1">
                <img src="../assets/icon-empty.svg" alt="empty-state" class="empty-state-img">
                <p class="empty-state-text body-lg-b">
                    Oopsie, seems that you have no settings yet
                </p>
                <p class="empty-state-underline body-sm">
                    Create your first setting!
                </p>
                <button @click="createSetting" class="btn btn-primary" aria-controls="create-setting">+</button>
            </div>

            <table class="table settings-table" v-show="settings?.length > 0">
                <thead>
                    <tr>
                        <th class="body-md column-setting-name">Setting name</th>
                        <th class="body-md status-cell">Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody class="settings-list">
                    <tr class="setting-line" v-for="(setting, idx) in filteredSettings" :key="idx">
                        <td class="cell column-setting-name">
                            <button @click="editSetting(setting.id)" class="body-md link setting-link">
                                {{ setting.title }}
                            </button>
                        </td>
                        <td class="status status-cell">
                            <span class="status-badge setting-status-badge body-md" :class="{
                                'active': setting.status === 'active'
                            }">
                                {{ setting.status }}
                            </span>
                        </td>
                        <td class="delete-icon-cell">
                            <button class="delete-setting" @click="deleteSetting(setting.id)">
                                <img class="delete-icon" src="../assets/Icon-remove.svg" alt="remove-icon"
                                    aria-controls="create-remove">
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    data() {
        return {
            filterByCurrency: '',
        };
    },
    computed: {
        // allows to use getters from the store as computed properties
        ...mapGetters({
            // yourOwnName: 'name as it's written in the store',
            settings: 'settings',
            usedCurrencies: 'usedCurrencies',
        }),
        /**
         * Filter settings by currency. If no currency to filter is selected, return all settings
         */
        filteredSettings() {
            return this.settings.filter((setting) => {
                if (!this.filterByCurrency) return true; // if no currency to filter is selected, return all settings
                return setting.formulas.some((formula) => formula.currency === this.filterByCurrency); // otherwise, filter by currency
            });
        },
    },
    methods: {
        ...mapActions({
            // yourOwnName: 'name as it's written in the store',
            removeSettingAction: 'removeSetting',
        }),
        /**
         * Redirects to the Setting view. If no id is provided, generates a new one to create a new setting.
         * 
         * @param id {String} - setting id
         */
        editSetting(id = null) {
            const timestamp = new Date().getTime();
            const settingId = id || `setting-${timestamp}`;
            this.$router.push({ name: 'Setting', params: { id: settingId } });
        },
        deleteSetting(id) {
            this.removeSettingAction(id);
        },
        /**
         * Redirects to the Setting view to create a new setting
         */
        createSetting() {
            this.editSetting();
        },
        /**
         * Sets currency to filter settings by
         * 
         * @param currency {String} - currency to filter settings by
         */
        setCurrencyToFilter(currency = '') {
            this.filterByCurrency = currency;
        },
    },
    created() {
    },
};
</script>

<style scoped></style>
