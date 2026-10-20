import React from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CardList from './components/CardList';

afterEach(cleanup);

test('search stays active when paging, and Previous never produces a negative page', () => {
  const data = Array.from({ length: 12 }, (_, i) => ({
    id: String(i), description: `Photo ${i}`, likes: 1,
    tags: [{ title: i === 0 ? 'portrait' : 'nature' }],
    user: { first_name: 'Test', last_name: 'Artist' }, urls: { small: 'test.jpg' },
  }));
  render(React.createElement(MemoryRouter, null, React.createElement(CardList, { data })));
  fireEvent.click(screen.getByText('Previous'));
  expect(screen.getByText('Photo 0')).toBeTruthy();
  fireEvent.change(screen.getByPlaceholderText('Tag Search'), { target: { value: 'nature' } });
  fireEvent.click(screen.getByDisplayValue('Search'));
  expect(screen.queryByText('Photo 0')).toBeNull();
  fireEvent.click(screen.getByText('Next'));
  expect(screen.getByText('Photo 11')).toBeTruthy();
  expect(screen.queryByText('Photo 0')).toBeNull();
  fireEvent.click(screen.getByText('Previous'));
  expect(screen.getByText('Photo 1')).toBeTruthy();
});
