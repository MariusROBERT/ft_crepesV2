import React, {useRef, useState} from 'react';
import bg from "./images/bg_empty.png";
import text from "./images/text.png"
import {
  Anchor,
  BackgroundImage,
  Center,
  Container,
  Flex,
  Image,
  MantineProvider,
  ScrollArea,
  Text
} from "@mantine/core";
import {useMediaQuery} from "@mantine/hooks";
import {MusicButton} from "./components/MusicButton";
import {
  CA42_lyrics,
  Elle_code_bien_sa_mere_lyrics,
  ft_crepesstyle_lyrics,
  Git_you_up_lyrics,
  Tout_niquer_lyrics
} from "./lyrics/lyrics";

export interface Music {
  name: string;
  mp3: string;
  lyrics?: string;
}

function App() {
  const [currentLine, setCurrentLine] = useState(0);
  const [currentMusic, setCurrentMusic] = React.useState<Music | null>(null);
  const viewportScroll = useRef<HTMLDivElement>(null);

  const isLargeScreen = useMediaQuery('(min-width: 35em)');

  const musicList: Music[] = [
    {name: "Git you up", mp3: "musics/Git_you_up.mp3", lyrics: Git_you_up_lyrics},
    {name: "CA42", mp3: "musics/CA42.mp3", lyrics: CA42_lyrics},
    {name: "Elle code bien sa mère", mp3: "musics/Elle_code_bien_sa_mere.mp3", lyrics: Elle_code_bien_sa_mere_lyrics},
    {name: "ft_crepestyle", mp3: "musics/ft_crepestyle.mp3", lyrics: ft_crepesstyle_lyrics},
    {name: "Tout niquer", mp3: "musics/Tout_niquer.mp3", lyrics: Tout_niquer_lyrics}
  ]

  function getTimedLyrics(fullLyrics: string | undefined, currentTime: number) {
    if (!fullLyrics)
      return;
    let currentLine = 0;
    // Replace next line with for loop with index and value
    const lines = fullLyrics.split("\n");
    for (const lineNumber in lines) {
      if (/^\[(\d+(\.\d+)?)](.*)/.test(lines[lineNumber])) {
        const [, time] = lines[lineNumber].match(/^\[(\d+(\.\d+)?)](.*)/) || [];
        if (parseFloat(time) < currentTime) {
          currentLine = parseInt(lineNumber);
        } else
          break;
      }
    }
    setCurrentLine(currentLine);
  }


  return (
      <MantineProvider withNormalizeCSS withGlobalStyles
                       theme={{
                         components: {
                           Button: {
                             sizes: {
                               xxl: (theme) => ({
                                 root: {
                                   fontSize: "1.5rem",
                                   padding: theme.spacing.xl
                                 }
                               })
                             }
                           }
                         }
                       }}
      >
        <Container p={0} m={0} miw={"100vw"} mih={"100vh"}>
          <BackgroundImage src={bg}>
            <Flex miw={"100vw"} mih={"100vh"} p={"sm"}
                  direction={"column"} align={"center"} justify={"space-evenly"}
            >
              <Center>
                <Image src={text}/>
              </Center>

              <Flex direction={isLargeScreen ? "row" : "column"}
                    align={"center"} justify={"center"} wrap={"wrap"}
                    p={"md"}
              >
                {musicList.map((music) => (
                    <MusicButton
                        music={music}
                        onSelectedMusic={setCurrentMusic}
                        key={music.name}
                    />
                ))}
              </Flex>

              <Flex direction={"column"} align={"center"} bg={"#8A8A8A99"} p={"md"}
                    style={{borderRadius: "15px", visibility: currentMusic ? "visible" : "hidden"}}
              >
                <Text fz={isLargeScreen ? "1.5rem" : "lg"} color={"white"}>Now playing: {currentMusic?.name}</Text>
                <br/>
                <Flex align={"center"}>
                  <audio controls src={process.env.PUBLIC_URL + currentMusic?.mp3}
                         autoPlay
                         onTimeUpdate={
                           (e) => getTimedLyrics(currentMusic?.lyrics, (e.target as HTMLAudioElement).currentTime)}>
                    <Text fz={"md"}>Your browser does not support the audio element.</Text>
                  </audio>
                  <Container p={"sm"}>
                    <Anchor href={currentMusic ? process.env.PUBLIC_URL + currentMusic?.mp3 : '#'} target={"_blank"}
                            download>
                      <svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 512 512">x
                        <path
                            d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32zM64 352c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V416c0-35.3-28.7-64-64-64H346.5l-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352H64zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"/>
                      </svg>
                    </Anchor>
                  </Container>
                </Flex>
                <ScrollArea h={'4.5em'} viewportRef={viewportScroll} maw={450}>
                  {
                    currentMusic?.lyrics?.split("\n").map((line, index) => (
                        <Text color={'white'} weight={index === currentLine ? 700: 300} key={index}>{line.replace(/^\[(\d+(\.\d+)?)]/, '')}</Text>
                    ))
                  }
                </ScrollArea>
              </Flex>

            </Flex>
          </BackgroundImage>
        </Container>
      </MantineProvider>
  );
}

export default App;
