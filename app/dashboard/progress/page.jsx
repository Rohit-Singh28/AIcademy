import dynamic from 'next/dynamic';
import StudentProgressBarChart from './_components/Bar';

const ThreeDPieChart = dynamic(() => import('./_components/Pie.jsx'), {
  ssr: false,
});

export default function Page() {
  return (
    <div className='flex flex-col gap-8'>
      <h1 className='text-2xl  text-slate-800 text-center font-semibold'>Student Progress Report</h1>
      <div>
        <StudentProgressBarChart />
      </div>
      <div className='w-full h-[1px] bg-slate-500'></div>
      <div>
        <ThreeDPieChart />
      </div>
    </div>
  );
}
