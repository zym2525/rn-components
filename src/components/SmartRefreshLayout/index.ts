import SmartRefreshLayout from './SmartRefreshLayout';
import ClassicsFooter from './ClassicsFooter';
import ClassicsHeader from './ClassicsHeader';
import BezierRadarHeader from './BezierRadarHeader';
import TwoLevelHeader from './TwoLevelHeader';

const SmartLayout = Object.assign(
    // @component ./SmartRefreshLayout.tsx
    SmartRefreshLayout,
    {
        // @component ./ClassicsFooter.tsx
        ClassicsFooter: ClassicsFooter,
        // @component ./ClassicsHeader.tsx
        ClassicsHeader: ClassicsHeader,
        // @component ./BezierRadarHeader.tsx
        BezierRadarHeader: BezierRadarHeader,
        // @component ./TwoLevelHeader.tsx
        TwoLevelHeader: TwoLevelHeader,
    }
);

export default SmartLayout;