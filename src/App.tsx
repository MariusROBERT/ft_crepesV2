import React from 'react';
import bg from "./images/bg_empty.png";
import {Anchor, BackgroundImage, Center, Container, Flex, MantineProvider, Text} from "@mantine/core";
import {useMediaQuery} from "@mantine/hooks";
import {MusicButton} from "./components/MusicButton";

interface Music {
  name: string;
  mp3: string;
}

function App() {
  const [nowPlaying, setNowPlaying] = React.useState("nothing");
  const [musicURL, setMusicURL] = React.useState("");

  const isLargeScreen = useMediaQuery('(min-width: 35em)');
  const isReallyLargeScreen = useMediaQuery('(min-width: 55em)');

  const musicList: Music[] = [
    {name: "Git you up", mp3: "musics/Git_you_up.mp3"},
    {name: "CA42", mp3: "musics/CA42.mp3"},
    {name: "Elle code bien sa mère", mp3: "musics/Elle_code_bien_sa_mere.mp3"},
    {name: "ft_crepestyle", mp3: "musics/ft_crepestyle.mp3"},
    {name: "Tout niquer", mp3: "musics/Tout_niquer.mp3"}
  ]

  return (
      <MantineProvider withNormalizeCSS withGlobalStyles
                       theme={{
                         components: {
                           Text: {
                             sizes: {
                               xxl: (theme) => ({
                                 root: {
                                   fontSize: isLargeScreen ? "1.5rem" : theme.fontSizes.lg
                                 }
                               }),
                               xxxl: () => ({
                                 root: {
                                   fontSize: isLargeScreen ? (isReallyLargeScreen ? "10rem" : "6rem") : "3rem",
                                   color: "white",
                                   fontWeight: "bold",
                                   fontStyle: "italic"
                                 }
                               })
                             }
                           },
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
                <Text size={"xxxl"}>FT_CRÊPES</Text>
              </Center>

              <Flex direction={isLargeScreen ? "row" : "column"}
                    align={"center"} justify={"center"} wrap={"wrap"}
                    p={"md"}
              >
                {musicList.map((music) => (
                    <MusicButton name={music.name}
                                 mp3={music.mp3}
                                 onMusicTitle={setNowPlaying}
                                 onMusicURL={setMusicURL}
                    />
                ))}
              </Flex>

              <Flex direction={"column"} align={"center"} bg={"#99999999"} p={"md"} style={{borderRadius: "15px"}}>
                <Text size={"xxl"} color={"white"}>Now playing: {nowPlaying}</Text>
                <br/>
                <Flex align={"center"}>
                  <audio controls src={musicURL}>
                    <Text fz={"md"}>Your browser does not support the audio element.</Text>
                  </audio>
                  <Container p={"sm"}>
                    <Anchor href={musicURL} target={"_blank"}>
                      <svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 512 512">x
                        <path
                            d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32zM64 352c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V416c0-35.3-28.7-64-64-64H346.5l-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352H64zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"/>
                      </svg>
                    </Anchor>
                  </Container>
                </Flex>
              </Flex>

            </Flex>
          </BackgroundImage>
        </Container>
      </MantineProvider>
  );
}

export default App;
