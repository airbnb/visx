import React, { useState } from 'react';
import cx from 'classnames';
import pkg from '../../package.json';
import Page from '../components/Page';
import {
  IconBookmark,
  ExpandChevron,
  ExpandFolder,
  Label,
  IconGallery,
  IconClipboardList,
  IconJustice,
} from '../components/Icons';

import * as AreaTile from '../components/Gallery/AreaTile';
import * as AxisTile from '../components/Gallery/AxisTile';
import * as BarGroupHorizontalTile from '../components/Gallery/BarGroupHorizontalTile';
import * as BarGroupTile from '../components/Gallery/BarGroupTile';
import * as BarStackHorizontalTile from '../components/Gallery/BarStackHorizontalTile';
import * as BarStackTile from '../components/Gallery/BarStackTile';
import * as BarsTile from '../components/Gallery/BarsTile';
import * as BrushTile from '../components/Gallery/BrushTile';
import * as ChordTile from '../components/Gallery/ChordTile';
import * as CurvesTile from '../components/Gallery/CurvesTile';
import * as DendrogramsTile from '../components/Gallery/DendrogramsTile';
import * as DotsTile from '../components/Gallery/DotsTile';
import * as DragIITile from '../components/Gallery/DragIITile';
import * as DragITile from '../components/Gallery/DragITile';
import * as GeoCustomTile from '../components/Gallery/GeoCustomTile';
import * as GeoMercatorTile from '../components/Gallery/GeoMercatorTile';
import * as GlyphsTile from '../components/Gallery/GlyphsTile';
import * as GradientsTile from '../components/Gallery/GradientsTile';
import * as HeatmapsTile from '../components/Gallery/HeatmapsTile';
import * as LegendsTile from '../components/Gallery/LegendsTile';
import * as LineRadialTile from '../components/Gallery/LineRadialTile';
import * as LinkTypesTile from '../components/Gallery/LinkTypesTile';
import * as NetworkTile from '../components/Gallery/NetworkTile';
import * as PackTile from '../components/Gallery/PackTile';
import * as PatternsTile from '../components/Gallery/PatternsTile';
import * as PiesTile from '../components/Gallery/PiesTile';
import * as PolygonsTile from '../components/Gallery/PolygonsTile';
import * as RadarTile from '../components/Gallery/RadarTile';
import * as ResponsiveTile from '../components/Gallery/ResponsiveTile';
import * as SplitLinePathTile from '../components/Gallery/SplitLinePathTile';
import * as StackedAreasTile from '../components/Gallery/StackedAreasTile';
import * as StatsPlotTile from '../components/Gallery/StatsPlotTile';
import * as StreamGraphTile from '../components/Gallery/StreamGraphTile';
import * as TextTile from '../components/Gallery/TextTile';
import * as ThresholdTile from '../components/Gallery/ThresholdTile';
import * as TooltipTile from '../components/Gallery/TooltipTile';
import * as TreemapTile from '../components/Gallery/TreemapTile';
import * as TreesTile from '../components/Gallery/TreesTile';
import * as VoronoiTile from '../components/Gallery/VoronoiTile';
import * as ZoomITile from '../components/Gallery/ZoomITile';

const tiles = [
  AreaTile,
  AxisTile,
  BarGroupTile,
  BarGroupHorizontalTile,
  BarStackTile,
  BarStackHorizontalTile,
  BarsTile,
  BrushTile,
  ChordTile,
  CurvesTile,
  DendrogramsTile,
  DotsTile,
  DragIITile,
  DragITile,
  GeoCustomTile,
  GeoMercatorTile,
  GlyphsTile,
  GradientsTile,
  HeatmapsTile,
  LegendsTile,
  LineRadialTile,
  LinkTypesTile,
  NetworkTile,
  PackTile,
  PatternsTile,
  PiesTile,
  PolygonsTile,
  RadarTile,
  ResponsiveTile,
  SplitLinePathTile,
  StackedAreasTile,
  StatsPlotTile,
  StreamGraphTile,
  TextTile,
  ThresholdTile,
  TooltipTile,
  TreemapTile,
  TreesTile,
  VoronoiTile,
  ZoomITile,
];

import { VxPackage } from '../types';
import exampleToVxDependencyLookup, { vxPackages } from '../sandboxes/exampleToVxDependencyLookup';

const lowercase = (str: string = '') => str.split(' ').map(s => s.toLocaleLowerCase());
const dasherize = (str: string = '') => `#${lowercase(str).join('-')}`;

interface TreeItemProps {
  expandable?: boolean;
  initialExpanded?: boolean;
  href?: string;
  label?: string;
  items?: React.ReactNode;
  children?: React.ReactNode;
}
const TreeItem = ({
  expandable,
  href,
  label,
  initialExpanded = true,
  items,
  children,
}: TreeItemProps) => {
  const [expanded, setExpanded] = useState(initialExpanded);
  const handleClick = () => setExpanded(!expanded);
  const classes = cx('tree-item', {
    'tree-item--expandable': expandable,
    'tree-item--expanded': expandable && expanded,
    '-mx-6': expandable,
    '-mx-1': !expandable,
  });
  const link = href || dasherize(label);
  return (
    <>
      <a href={link} className={classes} onClick={handleClick}>
        <ExpandChevron expand={expanded} />
        {!!expandable && <ExpandFolder expand={expanded} />}
        {label ? <Label label={label} /> : children}
      </a>
      {expandable &&
        expanded &&
        items &&
        React.Children.map(items, (item, i) => {
          return <div key={`${i}-${item}`}>{item}</div>;
        })}
      <style jsx>{`
        .tree-item {
          display: flex;
          flex-direction: row;
          align-items: center;
          padding: 0.25rem 0.5rem;
          cursor: pointer;
          font-size: 500;
        }
        .-mx-6 {
          margin-left: -1.5rem;
        }
        .-mx-1 {
          margin: 0 -0.25rem;
        }
      `}</style>
    </>
  );
};

const Sidebar = () => {
  return (
    <div className="sidebar">
      <TreeItem href="#introduction" expandable={false}>
        <IconBookmark />
        <Label label="Introduction" />
      </TreeItem>
      <TreeItem href="#gallery" expandable={false}>
        <IconGallery />
        <Label label="Gallery" />
      </TreeItem>
      <TreeItem href="#tutorial" expandable={false}>
        <IconClipboardList />
        <Label label="Tutorial" />
      </TreeItem>
      <TreeItem href="#license" expandable={false}>
        <IconJustice />
        <Label label="MIT License" />
      </TreeItem>
      <br />
      <TreeItem
        label={'Examples'}
        expandable={true}
        initialExpanded={true}
        items={tiles.map(vxPackage => (
          <div className="item">{`${vxPackage.packageJson.name.replace('@vx/demo-', '')}`}</div>
        ))}
      />
      <TreeItem
        label={'Packages'}
        expandable={true}
        initialExpanded={true}
        items={vxPackages.map(vxPackage => (
          <div className="item">{`@vx/${vxPackage}`}</div>
        ))}
      />
      <style jsx>{`
        .sidebar {
          width: 300px;
          padding-left: 1.5rem;
          margin-right: 1.5rem;
          overflow-y: auto;
          overflow-x: hidden;
        }
        .item {
          margin-left: 1.25rem;
          font-size: 16px;
          line-height: 1.5em;
        }
      `}</style>
    </div>
  );
};

const Content = () => {
  return (
    <div className="content">
      <section style={{ width: 720, fontSize: 22, fontWeight: 300 }}>
        <p>
          We made it a goal to unify our visualization stack across the company and in the process
          we created a new project that brings together the power of D3 with the joy of React.
        </p>
        <p className="font-medium">{`Advantages of ${pkg.brand}`}</p>
        <ul className="mx-12 mt-6">
          <li className="mb-3">
            <strong className="font-medium">Keep bundle sizes down.</strong>
            {` ${pkg.brand} is split into multiple packages.
            Start small and use only what you need.`}
          </li>
          <li className="mb-3">
            <strong className="font-medium">Un-opinionated on purpose.</strong>
            {` Bring your own state management,
            animation library, or css-in-js solution. Odds are good your React app already has an opinion on how
            animation or theming or styling is done. ${pkg.brand} is careful not to add another one and integrates with all of
            them.`}
          </li>
          <li className="mb-3">
            <strong className="font-medium">Not a charting library.</strong> As you start using
            visualization primitives, you’ll end up building your own charting library that’s
            optimized for your use case. You’re in control.
          </li>
        </ul>
        <p>
          And most importantly &mdash;{' '}
          {` it’s just React. If you know React, you can make visualizations. It’s all the same
          standard APIs and familiar patterns. ${pkg.brand} should feel at home in any React codebase.`}
        </p>
      </section>
      <style jsx>{`
        .content {
          display: flex;
          flex: 1;
          flex-direction: row;
        }
      `}</style>
    </div>
  );
};

const Home = () => (
  <Page>
    <Sidebar />
    <Content />
    <style jsx>{``}</style>
  </Page>
);
export default Home;
