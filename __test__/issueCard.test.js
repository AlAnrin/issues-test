import IssueCard from '../src/issueCard';
import renderer from 'react-test-renderer';
import React from 'react';

describe('issueCard test', () => {
    it('should render', () => {
        const issue = { state: 1, html_url: false, updated_at: 'Buy Milk', title: '', user: {login: ''}, comments: 0 };
        const rendered = renderer.create(
            <IssueCard issue={issue} />
        );
        expect(rendered.toJSON()).toMatchSnapshot();
    });
});