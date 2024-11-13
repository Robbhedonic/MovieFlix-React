import {beforeEach, describe, it} from 'vitest';

import {render, screen} from '@testing-library/react';


// Component to test....

import {HomePage} from './HomePage';

beforeEach(() => render(<HomePage/>));


describe('HomePage component', () =>{
    it('should hace a heading with the text MovieFlix', () => {
        // render (<HomePage/>);
        screen.getByRole('heading', {name: /MovieFlix/i});

    });
});

