import {Button} from "@mantine/core";
import {useMediaQuery} from "@mantine/hooks";


interface music {
  name: string;
  mp3: string;
  onMusicTitle: (str: string) => void;
  onMusicURL: (str: string) => void;
}


export function MusicButton(props: music) {

  const isLargeScreen = useMediaQuery('(min-width: 35em)');

  function changeMusic(name: string, mp3: string) {
    return () => {
      props.onMusicTitle(name);
      props.onMusicURL(mp3);
      document.querySelector("audio")?.load();
    }
  }

  return (
      <Button onClick={changeMusic(props.name, props.mp3)}
              size={isLargeScreen ? "xxl" : "lg"}
              radius={"md"}
              m={isLargeScreen ? "lg" : "md"}
              variant={"light"}
              color={"grape"}
      >
        {props.name}
      </Button>
  )
}