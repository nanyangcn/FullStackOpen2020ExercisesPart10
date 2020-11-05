import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';

import { SignInContainer } from '../../components/SignIn';

describe('SignInForm', () => {
  it('calls function provided by onSubmit prop after pressing the submit button', async () => {
    const onSubmit = jest.fn();
    const { getByTestId } = render(<SignInContainer onSubmit={onSubmit} />);

    fireEvent.changeText(getByTestId('usernameField'), 'kalle');
    fireEvent.changeText(getByTestId('passwordField'), 'password');
    fireEvent.press(getByTestId('submitButton'));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);

      expect(onSubmit.mock.calls[0][0]).toEqual({
        username: 'kalle',
        password: 'password',
      });
    });
  });
});
