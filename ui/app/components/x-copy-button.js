import Component from '@ember/component';
import { run } from '@ember/runloop';

export default Component.extend({
  classNames: ['x-copy-button'],

  actions: {
    success() {
      this.set('state', 'success');

      run.later(() => {
        this.set('state', null);
      }, 2000);
    },
  },
});
