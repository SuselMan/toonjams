import { lazy as ReactLazy, ComponentClass, FunctionComponent } from 'react';

type ComponentType<T = any> = ComponentClass<T> | FunctionComponent<T>;

/**
 * Able to lazy load React functional/class components with non defaults imports
 * and expand it to default import to make lazy loading work.
 */
function lazy<T extends { [V in K]: ComponentType }, K extends keyof T>(
  factory: () => Promise<T>,
  key: K
) {
  return ReactLazy(() => factory().then(cImport => ({ default: cImport[key] })));
}

const NoMatch = lazy(() => import('ui/components/no-match'), 'NoMatch');

const Authorization = lazy(() => import('ui/components/authorization/authorization-page-container'), 'AuthorizationPageContainer');
const MainPage = lazy(() => import('ui/components/main/main-page-container'), 'MainPageContainer');

const UsersList = lazy(() => import('ui/components/user/users-list-container'), 'UsersListContainer');
const UserPage = lazy(() => import('ui/components/user/user-page'), 'UserPage');
const SettingsPage = lazy(() => import('ui/components/user/user-settings-page'), 'UserSettingsPage');

const MediasPage = lazy(() => import('ui/components/media/medias-page-container'), 'MediasPageContainer');
const UploadMediaPage = lazy(() => import('ui/components/media/upload-media-page'), 'UploadMediaPage');

const EventsPage = lazy(() => import('ui/components/event/events-page-container'), 'EventsPageContainer');
const EventPage = lazy(() => import('ui/components/event/event-page'), 'EventPage');
const CreateEventPage = lazy(() => import('ui/components/event/create-event-page'), 'CreateEventPage');

interface ListOfLazyComponents {
  NoMatch: ComponentType,
  Authorization: ComponentType,
  MainPage: ComponentType,
  UsersList: ComponentType,
  UserPage: ComponentType,
  SettingsPage: ComponentType,
  MediasPage: ComponentType,
  UploadMediaPage: ComponentType,
  EventsPage: ComponentType,
  EventPage: ComponentType,
  CreateEventPage: ComponentType
}

export function getListOfLazyComponents(): ListOfLazyComponents {
  return {
    NoMatch,
    Authorization,
    MainPage,
    UsersList,
    UserPage,
    SettingsPage,
    MediasPage,
    UploadMediaPage,
    EventsPage,
    EventPage,
    CreateEventPage
  }
}