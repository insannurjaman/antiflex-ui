'use client';
import { useDemo } from './store';
import { DemoLink } from './common';
import { IconCircleCheck, IconArrowRight } from '@tabler/icons-react';
import { dateLabel } from './catalog';
import { Dashboard } from '../dashboard';
import { ActivityPage, AnalyticsPage, CustomersPage, ProjectsPage } from './workspace-pages';
import { ProfilePage, SettingsPage, TeamPage } from './account-pages';
import { BillingPage, CheckoutPage } from './commerce-pages';
import { OnboardingPage, SignInPage } from './getting-started-pages';
export function DemoPageContent({ slug }: { slug: string }) {
  switch (slug) {
    case 'analytics':
      return <AnalyticsPage />;
    case 'orders':
      return <Dashboard embedded view="orders" />;
    case 'customers':
      return <CustomersPage />;
    case 'projects':
      return <ProjectsPage />;
    case 'activity':
      return <ActivityPage />;
    case 'team':
      return <TeamPage />;
    case 'settings':
      return <SettingsPage />;
    case 'profile':
      return <ProfilePage />;
    case 'billing':
      return <BillingPage />;
    case 'checkout':
      return <CheckoutPage />;
    case 'sign-in':
      return <SignInPage />;
    case 'onboarding':
      return <OnboardingPage />;
    default:
      return null;
  }
}

export function OverviewPage() {
  const { state } = useDemo();
  return (
    <Dashboard
      embedded
      customerCount={state.customers.length}
      activityContent={
        <>
          <div className="activity-list">
            {state.activity.slice(0, 3).map((a) => (
              <div key={a.id}>
                <span className="activity-icon">
                  <IconCircleCheck size={17} />
                </span>
                <div>
                  <p>
                    <strong>{a.title}</strong>
                  </p>
                  <span>{a.detail}</span>
                </div>
                <time dateTime={a.date}>{dateLabel(a.date)}</time>
              </div>
            ))}
          </div>
          <DemoLink className="activity-link" href="/demo/activity">
            View all activity <IconArrowRight size={15} />
          </DemoLink>
        </>
      }
    />
  );
}
