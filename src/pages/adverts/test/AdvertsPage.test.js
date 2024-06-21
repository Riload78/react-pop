import { render, screen } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import AdvertsPage from '../AdvertsPage'
import { Provider } from 'react-redux'
import { advertsLoad } from '../../../store/actions'

jest.mock('../../../store/actions')

describe('AdvertsPage', () => {
  const state = {
    adverts: {
      isloadeded: true,
      data: [],
      maxPrice: 0,
    },
    ui: {
      loading: false,
      notification: {
        type: null,
        message: null,
      },
    },
  }

  const store = {
    dispatch: () => {},
    getState: () => state,
    subscribe: () => {},
    replaceReducer: () => {},
  }

  const renderComponent = () =>
    render(
      <Provider store={store}>
        <Router>
          <AdvertsPage />
        </Router>
      </Provider>
    )

  it('should render without crashing', () => {
    const { container } = renderComponent()
    expect(advertsLoad).toHaveBeenCalled()
    expect(container).toMatchSnapshot()
  })

  it('should render Not Result if Advert is empty', () => {
    state.adverts.data = []
    renderComponent()
    expect(
      screen.getByText('There are no publications yet')
    ).toBeInTheDocument()
  })

  it('should return a list of Adverts', () => {
    state.adverts.data = [
      {
        createdAt: '2024-06-21T12:37:04.000Z',
        id: '76e68c8c-1185-47b0-b55c-759d40cbd587',
        name: 'Editado',
        photo: null,
        price: 123,
        sale: false,
        tags: ['mobile'],
      },
    ]
    renderComponent()
    const advertsList = screen.getAllByRole('list')
    expect(screen.queryByText('There are no publications yet')).not.toBeInTheDocument()
				expect(advertsList).toHaveLength(1)
  })
})
