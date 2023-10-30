import {Button} from "@mantine/core";
import {useMediaQuery} from "@mantine/hooks";
import {Music} from "../App";


interface music {
  music: Music;
  onSelectedMusic: (music: Music) => void;
}


export function MusicButton(props: music) {

  const isLargeScreen = useMediaQuery('(min-width: 35em)');

  function changeMusic(music: Music) {
    return () => {
      props.onSelectedMusic(props.music);
    }
  }

  return (
      <Button onClick={changeMusic(props.music)}
              size={isLargeScreen ? "xxl" : "lg"}
              radius={"md"}
              m={isLargeScreen ? "lg" : "md"}
              variant={"light"}
              color={"grape"}
      >
        {props.music.name}
      </Button>
  )
}