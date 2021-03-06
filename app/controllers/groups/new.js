import Controller from '@ember/controller';
import { get, set, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { alias } from '@ember/object/computed';

export default Controller.extend({
  isSaving: false,
  privacyOptions: ['open', 'closed', 'restricted'],
  hoveredField: 'name',
  store: service(),
  group: alias('model.group'),

  categories: computed('model.categories', function() {
    return get(this, 'model.categories').map(category => (
      {
        id: get(category, 'id'),
        name: get(category, 'name'),
        slug: get(category, 'slug')
      }
    ));
  }).readOnly(),

  /** Determines if the submit button is disabled/enabled. */
  isValid: computed('group.validations.isValid', 'isSaving', function() {
    return get(this, 'group.validations.isValid') && !get(this, 'isSaving');
  }).readOnly(),

  actions: {
    selectCategory(category) {
      set(this, 'selectedCategory', category);
      const record = get(this, 'store').peekRecord('group-category', get(category, 'id'));
      this.group.set('category', record);
    },
  }
});
