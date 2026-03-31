import {EnterpriseHomepage} from '@/components/home/enterprise-homepage';
import {EnterpriseFooter} from '@/components/layout/enterprise-footer';
import {EnterpriseHeader} from '@/components/layout/enterprise-header';

export default function RootPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <EnterpriseHeader locale="zh" basePath="/" />
      <main className="flex-1">
        <EnterpriseHomepage locale="zh" />
      </main>
      <EnterpriseFooter locale="zh" basePath="/" />
    </div>
  );
}
