export const GenerateTokenExpTime = (longLiveInMinutes: number): number => {
  const originalDate = new Date();
  const longTime = Number(
    ((originalDate.getTime() + longLiveInMinutes * 60 * 1000) / 1000)
      .toString()
      .split('.')[0],
  );
  return longTime;
};
