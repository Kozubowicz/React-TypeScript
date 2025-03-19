import './Loader.scss';

type LoaderProps = {
  size?: string;
};

export function Loader({ size = '10vw' }: LoaderProps) {
  return (
    <>
      <div className='Loader' style={{ width: size, height: size }} />
    </>
  );
}
