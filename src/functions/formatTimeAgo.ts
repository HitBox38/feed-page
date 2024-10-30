import { formatDistanceToNowStrict } from "date-fns";

export const formatTimeAgo = (dateString: string): string => {
  const date = new Date(dateString);
  const timeDifference = formatDistanceToNowStrict(date, { addSuffix: false });

  return timeDifference
    .replace(" minutes", "m")
    .replace(" minute", "m")
    .replace(" hours", "h")
    .replace(" hour", "h")
    .replace(" days", "d")
    .replace(" day", "d")
    .replace(" weeks", "w")
    .replace(" week", "w")
    .replace(" months", "m")
    .replace(" month", "m")
    .replace(" years", "y")
    .replace(" year", "y");
};
