/**
 * AuthTabs — tabbed Sign In / Register panel used by PortalPage.
 * Uses the authSlice mock thunk. Shows "Demo access" notice per spec §3.3.
 *
 * Props:
 *   defaultTab  'signin' | 'register'  (default 'signin')
 *   onSuccess   () => void  called after successful mock auth
 */
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { signIn, selectAuthStatus, selectAuthError, clearAuthError } from '@/redux/slices/authSlice.js';
import InlineError from '@/components/feedback/InlineError.jsx';
import FormAlert from '@/components/feedback/FormAlert.jsx';

const signInSchema = z.object({
  email: z.string().email('Enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(120),
  email: z.string().email('Enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

function PasswordInput({ id, label, registration, error, errorId }) {
  const [show, setShow] = useState(false);
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-text mb-1">{label}</label>
      <div className="relative">
        <input
          id={id}
          type={show ? 'text' : 'password'}
          autoComplete={id === 'signin-password' ? 'current-password' : 'new-password'}
          aria-describedby={error ? errorId : undefined}
          aria-invalid={!!error}
          className={`w-full h-11 px-3 pr-10 rounded-lg border bg-bg text-text text-sm placeholder-muted-text focus-visible:outline-2 focus-visible:outline-accent-text transition-colors ${error ? 'border-rose-text' : 'border-line'}`}
          {...registration}
        />
        <button
          type="button"
          aria-pressed={show}
          aria-label={show ? 'Hide password' : 'Show password'}
          onClick={() => setShow((s) => !s)}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-text hover:text-text focus-visible:outline-2 focus-visible:outline-accent-text rounded p-1"
        >
          {show ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
          )}
        </button>
      </div>
      <InlineError id={errorId} message={error?.message} />
    </div>
  );
}

export default function AuthTabs({ defaultTab = 'signin', onSuccess }) {
  const dispatch = useDispatch();
  const authStatus = useSelector(selectAuthStatus);
  const authError = useSelector(selectAuthError);
  const [activeTab, setActiveTab] = useState(defaultTab);
  const isLoading = authStatus === 'authenticating';

  const signInForm = useForm({ resolver: zodResolver(signInSchema), mode: 'onTouched' });
  const registerForm = useForm({ resolver: zodResolver(registerSchema), mode: 'onTouched' });

  const handleSignIn = signInForm.handleSubmit(async ({ email }) => {
    dispatch(clearAuthError());
    const result = await dispatch(signIn({ email }));
    if (signIn.fulfilled.match(result)) onSuccess?.();
  });

  const handleRegister = registerForm.handleSubmit(async ({ email, name }) => {
    dispatch(clearAuthError());
    const result = await dispatch(signIn({ email, name }));
    if (signIn.fulfilled.match(result)) onSuccess?.();
  });

  return (
    <div>
      {/* Demo notice */}
      <div className="mb-6 rounded-lg border border-line bg-alt-surface px-4 py-3 text-sm text-muted-text">
        Demo access — accounts are not active yet. Any well-formed email is accepted.
      </div>

      {/* Tabs */}
      <div role="tablist" aria-label="Authentication options" className="flex border-b border-line mb-6">
        {(['signin', 'register']).map((tab) => (
          <button
            key={tab}
            role="tab"
            type="button"
            id={`tab-${tab}`}
            aria-controls={`panel-${tab}`}
            aria-selected={activeTab === tab}
            onClick={() => { setActiveTab(tab); dispatch(clearAuthError()); }}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors focus-visible:outline-2 focus-visible:outline-accent-text -mb-px ${
              activeTab === tab
                ? 'border-accent-text text-accent-text'
                : 'border-transparent text-muted-text hover:text-text'
            }`}
          >
            {tab === 'signin' ? 'Sign In' : 'Register'}
          </button>
        ))}
      </div>

      {authError && <FormAlert type="error" title={authError} className="mb-4" />}

      {/* Sign In panel */}
      <div role="tabpanel" id="panel-signin" aria-labelledby="tab-signin" hidden={activeTab !== 'signin'}>
        <form onSubmit={handleSignIn} noValidate className="space-y-4">
          <div>
            <label htmlFor="signin-email" className="block text-sm font-medium text-text mb-1">Email address</label>
            <input
              id="signin-email"
              type="email"
              autoComplete="email"
              aria-describedby={signInForm.formState.errors.email ? 'signin-email-error' : undefined}
              aria-invalid={!!signInForm.formState.errors.email}
              className={`w-full h-11 px-3 rounded-lg border bg-bg text-text text-sm placeholder-muted-text focus-visible:outline-2 focus-visible:outline-accent-text transition-colors ${signInForm.formState.errors.email ? 'border-rose-text' : 'border-line'}`}
              {...signInForm.register('email')}
            />
            <InlineError id="signin-email-error" message={signInForm.formState.errors.email?.message} />
          </div>
          <PasswordInput id="signin-password" label="Password" registration={signInForm.register('password')} error={signInForm.formState.errors.password} errorId="signin-password-error" />
          <button type="submit" disabled={isLoading} className="w-full h-11 rounded-lg bg-brand-btn-bg text-brand-btn-text text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-accent-text">
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>

      {/* Register panel */}
      <div role="tabpanel" id="panel-register" aria-labelledby="tab-register" hidden={activeTab !== 'register'}>
        <form onSubmit={handleRegister} noValidate className="space-y-4">
          <div>
            <label htmlFor="reg-name" className="block text-sm font-medium text-text mb-1">Full name</label>
            <input
              id="reg-name"
              type="text"
              autoComplete="name"
              aria-describedby={registerForm.formState.errors.name ? 'reg-name-error' : undefined}
              aria-invalid={!!registerForm.formState.errors.name}
              className={`w-full h-11 px-3 rounded-lg border bg-bg text-text text-sm placeholder-muted-text focus-visible:outline-2 focus-visible:outline-accent-text transition-colors ${registerForm.formState.errors.name ? 'border-rose-text' : 'border-line'}`}
              {...registerForm.register('name')}
            />
            <InlineError id="reg-name-error" message={registerForm.formState.errors.name?.message} />
          </div>
          <div>
            <label htmlFor="reg-email" className="block text-sm font-medium text-text mb-1">Email address</label>
            <input
              id="reg-email"
              type="email"
              autoComplete="email"
              aria-describedby={registerForm.formState.errors.email ? 'reg-email-error' : undefined}
              aria-invalid={!!registerForm.formState.errors.email}
              className={`w-full h-11 px-3 rounded-lg border bg-bg text-text text-sm placeholder-muted-text focus-visible:outline-2 focus-visible:outline-accent-text transition-colors ${registerForm.formState.errors.email ? 'border-rose-text' : 'border-line'}`}
              {...registerForm.register('email')}
            />
            <InlineError id="reg-email-error" message={registerForm.formState.errors.email?.message} />
          </div>
          <PasswordInput id="reg-password" label="Password" registration={registerForm.register('password')} error={registerForm.formState.errors.password} errorId="reg-password-error" />
          <button type="submit" disabled={isLoading} className="w-full h-11 rounded-lg bg-brand-btn-bg text-brand-btn-text text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-accent-text">
            {isLoading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  );
}
