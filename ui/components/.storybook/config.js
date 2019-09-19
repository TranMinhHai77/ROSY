import { configure, addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

function loadStories() {
  require('../stories');
}

addDecorator(withKnobs);
configure(loadStories, module);
