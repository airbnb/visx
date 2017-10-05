import Page from '../components/page';
import ZoomOne from '../components/tiles/zoom-i';
import DragOne from '../components/tiles/drag-i';
import DragTwo from '../components/tiles/drag-ii';
import DragThree from '../components/tiles/drag-iii';
import BrushOne from '../components/tiles/brush-i';

function Demo({ title, link, subtitle, description, children }) {
  return (
    <div className="demo">
      <div className="demo-header">
        <div className="title">
          <strong>{title}</strong>
        </div>
        <div className="subtitle">
          Based on Mike Bostock's <a href={link}>{subtitle}</a>
        </div>
      </div>
      {children}
      <div className="demo-description">{description}</div>
      <style jsx>{`
        .demo {
          min-width: 40vw;
          flex: 1;
          display: flex;
          flex-direction: column;
          margin-right: 1rem;
        }
        .demo-header {
          display: flex;
          flex-direction: column;
        }
        .title {
          display: flex;
          flex: 1;
          font-size: 28px;
          margin-bottom: 1rem;
        }
        .demo-description {
          font-size: 16px;
          margin-bottom: 2rem;
        }
        .subtitle {
          font-size: 12px;
        }
      `}</style>
    </div>
  );
}

export default class Interactions extends React.Component {
  render() {
    return (
      <Page>
        <h1>Interactions</h1>
        <div className="interactions">
          <Demo
            title={'Pan & Zoom I'}
            link="https://bl.ocks.org/mbostock/4e3925cdc804db257a86fdef3a032a45"
            subtitle={'Pan & Zoom III'}
            description={
              'Scroll wheel zoom, programmatic zoom with buttons'
            }
          >
            <ZoomOne />
          </Demo>
          <Demo
            title="Drag I"
            subtitle="Circle Dragging II"
            link="https://bl.ocks.org/mbostock/c206c20294258c18832ff80d8fd395c3"
            description={'Drag the circles'}
          >
            <DragOne />
          </Demo>
          <Demo
            title="Drag II"
            subtitle="Line Drawing"
            link="https://bl.ocks.org/mbostock/f705fc55e6f26df29354"
            description="Click and drag to doodle"
          >
            <DragTwo />
          </Demo>
          <Demo
            title="Drag III"
            subtitle="Circle Dragging IV"
            link="https://bl.ocks.org/mbostock/ec10387f24c1fad2acac3bc11eb218a5"
            description="Circle dragging with voronoi"
          >
            <DragThree />
          </Demo>
          <Demo
            title="Bush I"
            subtitle={'Brush & Zoom'}
            link="https://bl.ocks.org/mbostock/34f08d5e11952a80609169b7917d4172"
          >
            <BrushOne />
          </Demo>
          <div className="demo code"> </div>
        </div>
        <style jsx>{`
          .interactions {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
          }
          .demo {
            min-width: 40vw;
            flex: 1;
            display: flex;
            flex-direction: column;
          }
        `}</style>
      </Page>
    );
  }
}
