import { ReportGenerator } from './ReportGenerator';
import { ReportStats } from './ReportStats';
import { AcademicReasonsChart } from './AcademicReasonsChart';
import { ReportDetailsTable } from './ReportDetailsTable';

export function ReportsView() {
  return (
    <div className="space-y-6">
      <ReportGenerator />
      <ReportStats />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <AcademicReasonsChart />
        </div>
        <div className="lg:col-span-2">
          <ReportDetailsTable />
        </div>
      </div>
    </div>
  );
}
