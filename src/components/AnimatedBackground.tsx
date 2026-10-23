/** Floating pastel blobs that create an aurora-like mesh gradient over the dark base. */
export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div
        className="blob blob-1"
        style={{
          width: '500px',
          height: '500px',
          background: 'var(--pastel-pink)',
          top: '-100px',
          left: '-80px',
        }}
      />
      <div
        className="blob blob-2"
        style={{
          width: '600px',
          height: '600px',
          background: 'var(--pastel-lilac)',
          top: '30%',
          right: '-150px',
        }}
      />
      <div
        className="blob blob-3"
        style={{
          width: '450px',
          height: '450px',
          background: 'var(--pastel-blue)',
          bottom: '-100px',
          left: '20%',
        }}
      />
      <div
        className="blob blob-1"
        style={{
          width: '380px',
          height: '380px',
          background: 'var(--pastel-mint)',
          top: '60%',
          left: '-60px',
          animationDelay: '3s',
        }}
      />
      <div
        className="blob blob-2"
        style={{
          width: '400px',
          height: '400px',
          background: 'var(--pastel-peach)',
          top: '10%',
          right: '30%',
          animationDelay: '5s',
        }}
      />
    </div>
  );
}
