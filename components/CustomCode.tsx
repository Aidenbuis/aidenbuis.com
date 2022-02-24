export default function CustomCode({ ...otherProps }) {
  return (
    <code
      className="px-2 text-orange-600 bg-orange-100 rounded-md"
      {...otherProps}
    />
  );
}
