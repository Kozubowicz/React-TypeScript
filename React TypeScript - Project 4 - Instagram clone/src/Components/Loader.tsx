import './Loader.scss';

type LoaderProps = {
  size?: string;
};

export function Loader({ size = '48px' }: LoaderProps) {
  return (
    <>
      <div className='Loader'>
        <div className='Loader--img' style={{ width: size, height: size }} />
      </div>
    </>
  );
}
