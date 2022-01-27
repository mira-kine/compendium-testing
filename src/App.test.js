import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('pokemon should search by query', async () => {
  render(<App />);
  // loading
  // const loading = await screen.getByText(/loading/i);
  // expect(loading).toBeInTheDocument();
  // search textbox
  const searchBar = await screen.findByRole('textbox');
  // search button
  const pokeName = 'butterfree';
  userEvent.type(searchBar, pokeName);

  // Search butterfree with type then click
  const button = screen.getByRole('button');
  userEvent.click(button);
  // check to see that name on screen matches name in search bar, exact false
  const poke = await screen.findAllByText(pokeName, { exact: false });
  // map through pokemon for correct text content = result of search
  const result = poke.map((item) => item.textContent);
  // create function that will check if searchbar name = result name
  const handleName = (name) => name.toLowerCase().includes(pokeName);
  // use .every to check if name fulfills handleName
  const checkName = result.every(handleName);
  expect(checkName).toBe(true);
});
