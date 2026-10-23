/** @jsxImportSource @revideo/2d/lib */
import {Circle, Rect, Txt, makeScene2D} from '@revideo/2d';
import {all, createRef, waitFor} from '@revideo/core';

export default makeScene2D('hello', function* (view) {
  view.fill('#0b1020');

  const disk = createRef<Circle>();
  const title = createRef<Txt>();
  const subtitle = createRef<Txt>();
  const accent = createRef<Rect>();

  view.add(
    <>
      <Circle ref={disk} x={-220} y={-45} size={170} fill="#43e6c3" scale={0.05} />
      <Rect ref={accent} x={0} y={133} width={400} height={7} radius={4}
        fill="#43e6c3" opacity={0} />
      <Txt ref={title} y={-180} text="HELLO, REVIDEO" fontSize={66}
        fontWeight={800} fill="#ffffff" opacity={0} />
      <Txt ref={subtitle} y={204} text="Built with code. Rendered on GitHub."
        fontSize={27} fill="#afbbd7" opacity={0} />
    </>,
  );

  yield* all(disk().scale(1, 0.75), disk().position.x(0, 0.75));
  yield* all(
    title().opacity(1, 0.5),
    subtitle().opacity(1, 0.6),
    accent().opacity(1, 0.55),
  );
  yield* waitFor(1.2);
  yield* all(disk().scale(1.16, 0.35), disk().rotation(45, 0.35));
  yield* disk().scale(1, 0.35);
  yield* waitFor(0.3);
});
