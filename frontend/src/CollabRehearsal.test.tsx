import { render, screen } from '@testing-library/react';
import NotesPageLoggedOutView from './components/NotesPageLoggedOutView';
import NotesPageLoggedInView from './components/NotesPageLoggedInView';
import PrivacyPage from './pages/PrivacyPage';
import * as NotesApi from './network/notes_api';

jest.mock('./network/notes_api');
test('rehearsal: logged-out welcome and actions are visible', () => {
    render(<NotesPageLoggedOutView />);
    expect(screen.getByRole('heading', { name: 'Welcome to Team Notes' })).toBeInTheDocument();
    expect(screen.getByText('Choose Sign Up to create an account, or Log In to see your notes.')).toBeInTheDocument();
});
test('rehearsal: empty account receives the new-note guidance', async () => {
    (NotesApi.fetchNotes as jest.Mock).mockResolvedValue([]);
    render(<NotesPageLoggedInView />);
    expect(await screen.findByText('No notes yet. Choose Add new note to create your first note.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Add new note/ })).toBeInTheDocument();
});
test('rehearsal: privacy page gives shared-computer guidance', () => {
    render(<PrivacyPage />);
    expect(screen.getByRole('heading', { name: 'Your notes and privacy' })).toBeInTheDocument();
    expect(screen.getByText('Sign in to view your own notes. Log out when using a shared computer.')).toBeInTheDocument();
});
