import { render, screen, act} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LoginPage from '../LoginPage'
import { Provider } from 'react-redux'
import { authLogin, sessionSave } from '../../../store/actions'
jest.mock('../../../store/actions')

describe('LoginPage', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })
  const state = {
    auth: {
      isSessionSaved: true,
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
        <LoginPage />
      </Provider>
    )

  test('snapshot', () => {
    const { container } = renderComponent()
    expect(container).toMatchSnapshot()
  })

  test('should dispach login action', () => {
    renderComponent()
    const userEmail = 'test'
    const userPassword = 'test'
    const email = screen.getByLabelText(/Email/)
    const password = screen.getByLabelText(/Password/)
    const submit = screen.getByRole('button')

    expect(email).toBeInTheDocument()
    expect(password).toBeInTheDocument()
    expect(submit).toBeDisabled()

		// eslint-disable-next-line testing-library/no-unnecessary-act
		act(() => {
			userEvent.type(email, userEmail)
			userEvent.type(password, userPassword)
			
		})
    expect(submit).not.toBeDisabled()
    userEvent.click(submit)

    expect(authLogin).toHaveBeenCalled()
  })

	test('handleSwitch', () => {
		renderComponent()
		const switchElement = screen.getByLabelText(/i wan't save the session/i)
		userEvent.click(switchElement)
		expect(sessionSave).toHaveBeenCalledWith(true) 
	})
})
