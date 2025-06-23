import Icon from './Icon';

export default function Loading() {
  return (
    <div className="flex items-center justify-center text-black-rock-950 pt-8">
      <div className="animate-spin">
        <Icon name="Loader2" className="h-10 w-10" />
      </div>
    </div>
  );
}