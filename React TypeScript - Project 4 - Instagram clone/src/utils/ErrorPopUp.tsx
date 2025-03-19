type ErrorPopUpProps = {
  message: string;
};

export function ErrorPopUp({ message }: ErrorPopUpProps) {
  return (
    <>
      <div className='ErrorPopUp'>{message}</div>
    </>
  );
}
