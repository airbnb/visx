import { LegendQuantile, LegendLinear, LegendOrdinal, LegendThreshold } from '@vx/legend';
import { scaleQuantize, scaleLinear, scaleOrdinal, scaleThreshold } from '@vx/scale';
import { format } from 'd3-format';

const oneDecimalFormat = format('.1f');
const twoDecimalFormat = format('.2f');

const quantile = scaleQuantize({
  domain: [0, 0.15],
  range: [
    '#feedde', '#fdd0a2', '#fdae6b',
    '#fd8d3c', '#f16913', '#d94801',
    '#8c2d04'
  ]
});

const linear = scaleLinear({
  domain: [0, 10],
  range: ["#0068af", "#c00029"]
});

const ordinal = scaleOrdinal({
  domain: ['a', 'b', 'c', 'd'],
  range: ['#160689', '#a72297', '#f68e44', '#f8e126']
});

const threshold = scaleThreshold({
  domain: [0.02, 0.04, 0.06, 0.08, 0.10],
  range: ["#f2f0f7", "#dadaeb", "#bcbddc", "#9e9ac8", "#756bb1", "#54278f"]
});

export default () => {
  return (
    <div className="chart">
      <div className="legend">
        <LegendQuantile
          scale={quantile}
          labelFormat={twoDecimalFormat}
          labelDelimiter='to'
          direction='row'
          labelMargin="0 10px 0 2px"
        />
      </div>
      <div className="legend">
        <LegendQuantile
          scale={quantile}
          labelFormat={twoDecimalFormat}
          shapeMargin='0 0 10px 0'
          shapeWidth='100%'
          direction='row-reverse'
          itemDirection='column'
        />
      </div>
      <div className="legend">
        <LegendQuantile
          scale={quantile}
          labelFormat={twoDecimalFormat}
          labelDelimiter="to"
          direction='column-reverse'
          shapeMargin="0"
        />
      </div>
      <div className="legend">
        <LegendQuantile
          scale={quantile}
          labelFormat={twoDecimalFormat}
          direction='column'
          itemDirection='column-reverse'
          shapeWidth='100%'
          itemMargin='0 0 6px 0'
        />
      </div>
      <div className="legend">
        <div className="title">
          Linear
        </div>
        <LegendLinear
          scale={linear}
          labelFormat={(d,i) => [0,2,4].includes(i) ? oneDecimalFormat(d) : ''}
          direction="column"
          steps={5}
        />
      </div>
      <div className="legend">
        <div className="title">
          Ordinal
        </div>
        <LegendOrdinal
          scale={ordinal}
          direction="row"
          itemDirection="column"
          labelMargin="0"
          shapeMargin="0 0 8px 0"
          itemMargin="0 4px 0 0"
        />
      </div>
      <div className="legend">
        <div className="title">
          Threshold
        </div>
        <LegendThreshold
          scale={threshold}
          direction='column-reverse'
          itemDirection='row-reverse'
          labelFormat={d => !!d ? `${d * 100}%` : ''}
          labelAlign='flex-end'
          shapeMargin='0 0 2px 4px'
        />
      </div>

      <style jsx>{`
        .chart {
          font-family: arial;
          font-weight: 900;
        }
        .chart h2 {
          margin-left: 10px;
        }
        .legend {
          color: #333;
          margin: 0 5px 10px;
          float: left;
          clear: top;
          font-size: 10px;
          font-family: arial;
          border: 1px solid #efefef;
          padding: 15px 20px;
          border-radius: 6px;
          flex: initial;
        }
        .title {
          font-size: 12px;
          margin-bottom: 10px;
          font-weight: 100;
        }
      `}</style>
    </div>
  );
}