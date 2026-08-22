interface AvatarProps {
  name: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "avatar avatar-sm",
  md: "avatar avatar-md",
  lg: "avatar avatar-lg",
};

export function Avatar({ name, size = "md" }: AvatarProps) {
  const initial = name.charAt(0).toUpperCase();

  return (
    <div className={sizeClasses[size]} aria-label={name}>
      {initial}
    </div>
  );
}
