import { render, screen } from '@testing-library/react'
import LoginPage from '../LoginPage'
import { Provider } from 'react-redux'
describe('LoginPage', () => {
    const state = {
        auth: {
            isSessionSaved: true
        },
        ui:{
            loading: false,
            notification: {
                type: null,
                message: null
            }
        }
    }

    const store = {
      dispatch: () => {},
      getState: () => state,
      subscribe: () => {},
      replaceReducer: () => {},
    }
    const renderComponent = () => render(
        <Provider store={store}>
            <LoginPage />
        </Provider>
    )

    test('snapshot', () => {
        const { container } = renderComponent()
        expect(container).toMatchSnapshot()
    })

    test('should dispach login action', () => {
        renderComponent()
        const email = screen.getByLabelText(/email/)
        const password = screen.getByLabelText('password')
        const remember = screen.getByLabelText('remember')
        const submit = screen.getByLabelText('submit')
    })
})