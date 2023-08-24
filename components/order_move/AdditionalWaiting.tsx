import LayoutState from './LayoutState';

const additionalWaiting = 20;

export default function AdditionalWaiting() {
  return (
    <LayoutState className="w-auto h-[200px] flex justify-center items-center gap-2">
      <div>추가 대기 현황</div>
      <div className="text-7xl font-bold">{additionalWaiting}</div>
    </LayoutState>
  );
}
