package com.codestates.tag.entity;

<<<<<<< HEAD
=======
import com.codestates.reviewBoard.entity.ReviewBoardTag;
import com.codestates.user.entity.UserTag;
>>>>>>> 15fbec5c8b5341e55b2723cc04b81dd42cf21ec0
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

<<<<<<< HEAD
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Objects;

@NoArgsConstructor
@Getter
@Setter
@Entity
=======
import javax.persistence.*;

@Getter
@Setter
@Entity
@NoArgsConstructor
>>>>>>> 15fbec5c8b5341e55b2723cc04b81dd42cf21ec0
public class Tag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tagId;
<<<<<<< HEAD
    private String tagName;

    public Tag(String tagName) {
        this.tagName = tagName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Tag tag = (Tag) o;
        return Objects.equals(tagName, tag.tagName);
    }

    @Override
    public int hashCode() {
        return Objects.hash(tagName);
    }
=======

    private String tagName;

//    @OneToMany(mappedBy = "tag", cascade = CascadeType.ALL)
//    private ReviewBoardTag reviewBoardTag;
//
//    @OneToMany(mappedBy = "tag", cascade = CascadeType.ALL)
//    private UserTag userTag;
>>>>>>> 15fbec5c8b5341e55b2723cc04b81dd42cf21ec0
}
