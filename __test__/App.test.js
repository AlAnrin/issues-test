import React from 'react';
import App from '../src/App';
import renderer from 'react-test-renderer';

describe('App test',()=> {
    it('should render', () => {
        const rendered = renderer.create(
            <App/>
        );
        expect(rendered.toJSON()).toMatchSnapshot();
    });
});
