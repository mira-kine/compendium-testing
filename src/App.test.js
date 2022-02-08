import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import App from './App';

const butterfree = {
  count: 1,
  page: 1,
  perPage: 20,
  sort: {
    by: '_id',
    direction: 'asc',
  },
  search: {
    pokemon: 'butterfree',
  },
  results: [
    {
      _id: '5ff4fb7cd89993a89cc6544f',
      pokemon: 'butterfree',
      id: 16,
      species_id: 12,
      height: 11,
      weight: 320,
      base_experience: 178,
      type_1: 'bug',
      type_2: 'flying',
      attack: 45,
      defense: 50,
      hp: 60,
      special_attack: 90,
      special_defense: 80,
      speed: 70,
      ability_1: 'compound-eyes',
      ability_2: 'NA',
      ability_hidden: 'tinted-lens',
      color_1: '#A8B820',
      color_2: '#A890F0',
      color_f: '#A8AE52',
      egg_group_1: 'bug',
      egg_group_2: 'NA',
      url_image: 'http://assets.pokemon.com/assets/cms2/img/pokedex/full/012.png',
      generation_id: 1,
      evolves_from_species_id: '11',
      evolution_chain_id: 4,
      shape_id: 13,
      shape: 'bug-wings',
      pokebase: 'butterfree',
      pokedex: 'http://www.pokemon.com/us/pokedex/butterfree',
    },
  ],
};

const server = setupServer(
  rest.get(`https://pokedex-alchemy.herokuapp.com/api/pokedex`, (req, res, ctx) => {
    return res(ctx.json(butterfree));
  })
);
beforeAll(() => server.listen());
afterAll(() => server.close());

test('pokemon should search by query', async () => {
  render(<App />);
  const searchBar = await screen.findByRole('textbox');
  const pokeName = 'butterfree';
  userEvent.type(searchBar, pokeName);
  const button = screen.getByRole('button');
  userEvent.click(button);
  const poke = await screen.findAllByText(pokeName, { exact: false });
  const result = poke.map((item) => item.textContent);
  const handleName = (name) => name.toLowerCase().includes(pokeName);
  const checkName = result.every(handleName);
  expect(checkName).toBe(true);
});
