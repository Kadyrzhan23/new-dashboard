export default function Comments({ comment }: { comment: string }) {

    if(!comment || comment === '') {return <></>}
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-md p-4 mt-2 space-y-1 text-gray-700 text-sm">
      <p>{comment}</p>
    </div>
  );
}
