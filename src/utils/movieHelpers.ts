const formatRunTime = (runtime?: number) => {
   if (!runtime) return "";

   const hours = runtime / 60;
   const rhours = Math.floor(runtime / 60);
   const min = Math.floor((hours - rhours) * 60);

   return `${rhours}h ${min}m`;
};

const formatRating = (voteAverage: number) => {
   return +((voteAverage * 5) / 10).toFixed(1);
};

const formatVoteCount = (amount: number) => {
   const fomatter = Intl.NumberFormat("en-US", {
      style: "decimal",
   });

   return fomatter.format(amount);
};

export default {
   formatRunTime,
   formatRating,
   formatVoteCount,
};
