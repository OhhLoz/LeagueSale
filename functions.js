/**
 * Populates counts with servers, channels, users and bot count based on the given guild object
 *
 *
 * @param {Object}   guild     Guild object used to check for all the relevant stats
 * @param {Object}   counts   Object used to track the current various counts associated with the bot
 * @param {boolean}  isJoin    Used to determine whether to add or subtract the stats from the global total
 *
 * @return {Object}            Returns the populated counts object.
 */
var checkCounts = (guild, counts, isJoin) =>
{
  if (isJoin)
  {
    counts.servercount += 1;
    counts.channelcount += guild.channels.cache.filter(channel => channel.type != 'category').size;
    //usercount += guild.members.cache.filter(member => !member.user.bot).size;
    counts.usercount += guild.memberCount;
  }
  else
  {
    counts.servercount -= 1;
    counts.channelcount -= guild.channels.cache.filter(channel => channel.type != 'category').size;
    //usercount += guild.members.cache.filter(member => !member.user.bot).size;
    counts.usercount -= guild.memberCount;
  }

  return counts;
}

/**
 * Formats the time given (in milliseconds) to a human readable string.
 *
 * @param {number}   milli           input time in milliseconds.
 *
 * @return {string}                  Returns the formatted time as a string.
 */
let getTime = (milli) => {
    let time = new Date(milli);
    let hours = time.getUTCHours();
    let minutes = time.getUTCMinutes();
    let seconds = time.getUTCSeconds();
    //let milliseconds = time.getUTCMilliseconds();
    return hours + "H " + minutes + "M " + seconds + "S";
  }

module.exports = {checkCounts, getTime}