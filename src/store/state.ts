const state: Music.State = {
  singer: {
    id: '',
    name: '',
    avatar: '',
  },
  playing: false,
  fullScreen: false,
  playList: [],
  sequenceList: [],
  mode: Music.PlayMode.Sequence,
  currentIndex: -1,
};

export default state;
