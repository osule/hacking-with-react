jest.autoMockOff();

import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import TestUtils from 'react-dom/test-utils';

const List = require('../src/pages/List').default;

describe('List', () => {
  it('renders three repo links', () => {
    const rendered = TestUtils.renderIntoDocument(
      <MemoryRouter>
         <List />
      </MemoryRouter>
    );

    const repos = TestUtils.scryRenderedDOMComponentsWithTag(rendered, 'li');
    expect(repos.length).toEqual(3);
  });
});
