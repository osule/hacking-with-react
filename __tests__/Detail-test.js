jest.autoMockOff();

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';

const Detail = require('../src/pages/Detail').default;


describe('Detail', () => {
  // tests go here
  it('starts with 0 commits', () => {
    const renderedTree = TestUtils.renderIntoDocument(
      <MemoryRouter>
        <Detail match={{ params: { repo: '' } }} />
      </MemoryRouter>
    );
    const rendered = TestUtils.scryRenderedComponentsWithType(renderedTree, Detail)[0];
    const forks = TestUtils.scryRenderedDOMComponentsWithClass(rendered, 'github');
    expect(forks.length).toEqual(0);
  });
  it('shows commit data by default', () => {
    const renderedTree = TestUtils.renderIntoDocument(
      <MemoryRouter>
        <Detail match={{ params: { repo: '' } }} />
      </MemoryRouter>
    );
    const rendered = TestUtils.scryRenderedComponentsWithType(renderedTree, Detail)[0];
    expect(rendered.state.mode).toEqual('commits');
  });

  it('shows forks data when Forks button is clicked', () => {
    const renderedTree = TestUtils.renderIntoDocument(
      <MemoryRouter>
        <Detail match={{ params: { repo: '' } }} />
      </MemoryRouter>
    );

    const rendered = TestUtils.scryRenderedComponentsWithType(renderedTree, Detail)[0];
    const forksButton = rendered.refs.forks;
    TestUtils.Simulate.click(forksButton);
    expect(rendered.state.mode).toEqual('forks');
  });

  it('fetches forks from GitHub', () => {
    const renderedTree = TestUtils.renderIntoDocument(
      <MemoryRouter>
        <Detail match={{ params: { repo: 'react' } }} />
      </MemoryRouter>
    );
    const rendered = TestUtils.scryRenderedComponentsWithType(renderedTree, Detail)[0];
    setTimeout(() => {
      if (rendered.state.forks.length > 0) expect(rendered.state.forks.length).toEqual(30);
    }, 2000);
  });

  it('fetches forks from a local source', () => {
    const renderedTree = TestUtils.renderIntoDocument(
      <MemoryRouter>
        <Detail match={{ params: { repo: '' } }} />
      </MemoryRouter>
    );
    const testData = require('./forks.json');
    const rendered = TestUtils.scryRenderedComponentsWithType(renderedTree, Detail)[0];
    rendered.saveFeed('forks', testData);
    rendered.selectMode('forks');

    const forks = TestUtils.scryRenderedDOMComponentsWithClass(rendered, 'github');
    expect(forks.length).toEqual(30);
  });
});